import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, itemName = "Premium SaaS Blueprint", totalAmount = 49900 } = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const partner_order_id = `ORDER_${Date.now()}`;
    const partner_user_id = userId || "GUEST_USER";
    
    // 카카오페이 결제 준비 API 요청을 위한 데이터 파라미터 구성
    const params = new URLSearchParams({
      cid: process.env.NEXT_PUBLIC_KAKAO_CID || "TC0ONETIME", // 단건 결제 테스트 CID
      partner_order_id,
      partner_user_id,
      item_name: itemName,
      quantity: "1",
      total_amount: totalAmount.toString(),
      tax_free_amount: "0",
      approval_url: `${baseUrl}/payment/success`,
      cancel_url: `${baseUrl}/payment/cancel`,
      fail_url: `${baseUrl}/payment/fail`,
    });

    const response = await fetch("https://kapi.kakao.com/v1/payment/ready", {
      method: "POST",
      headers: {
        "Authorization": `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: params.toString()
    });

    const data = await response.json();
    
    if (data.tid) {
      // Approve 단계를 위해 HTTP Only 쿠키에 tid와 파트너 정보를 임시 저장 (MVP용)
      const cookieStore = await cookies();
      cookieStore.set("kakao_tid", data.tid, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      cookieStore.set("partner_order_id", partner_order_id, { httpOnly: true });
      cookieStore.set("partner_user_id", partner_user_id, { httpOnly: true });
      
      return NextResponse.json({ url: data.next_redirect_pc_url });
    }

    return NextResponse.json({ error: data }, { status: 400 });

  } catch (error) {
    console.error("Payment Ready Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
