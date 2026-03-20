import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { pg_token } = await request.json();
    
    if (!pg_token) {
      return NextResponse.json({ error: "Missing pg_token" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const tid = cookieStore.get("kakao_tid")?.value;
    const partner_order_id = cookieStore.get("partner_order_id")?.value;
    const partner_user_id = cookieStore.get("partner_user_id")?.value;

    if (!tid) {
      return NextResponse.json({ error: "Invalid Session or TID not found" }, { status: 400 });
    }

    const params = new URLSearchParams({
      cid: process.env.NEXT_PUBLIC_KAKAO_CID || "TC0ONETIME",
      tid: tid,
      partner_order_id: partner_order_id || "GUEST_USER",
      partner_user_id: partner_user_id || "GUEST_USER",
      pg_token: pg_token
    });

    const response = await fetch("https://kapi.kakao.com/v1/payment/approve", {
      method: "POST",
      headers: {
        "Authorization": `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: params.toString()
    });

    const data = await response.json();
    
    // Cookie Cleanup
    cookieStore.delete("kakao_tid");
    cookieStore.delete("partner_order_id");
    cookieStore.delete("partner_user_id");

    if (data.aid) {
      return NextResponse.json({ success: true, payment: data });
    } else {
      return NextResponse.json({ error: data }, { status: 400 });
    }
  } catch(error) {
    console.error("Payment Approve Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
