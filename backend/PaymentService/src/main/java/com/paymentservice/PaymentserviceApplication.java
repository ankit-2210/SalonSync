package com.paymentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PaymentserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentserviceApplication.class, args);
	}

}

//http://localhost:3000/payment-success/102?razorpay_payment_id=pay_STY3vu9IIsZz1c&razorpay_payment_link_id=plink_STY1oMV3P68A2j&razorpay_payment_link_reference_id=&razorpay_payment_link_status=paid&razorpay_signature=3deb5b6bf9bcaf768f0853a07ab2d6395e4c486fde3610db0edfadaa96799112