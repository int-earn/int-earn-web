package com.intearn.backend;

import com.intearn.backend.s3.S3Buckets;
import com.intearn.backend.s3.S3Service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(S3Service s3Service, S3Buckets s3Buckets) {
		return args -> {
			//testBucketUpload(s3Service, s3Buckets);
			//1:19:41
		};
	}

	private static void testBucketUpload(S3Service s3Service, S3Buckets s3Buckets) {
		s3Service.putObject(
				s3Buckets.getCustomer(),
				"foo/bar/jamila",
				"Hello World".getBytes()
		);

		byte[] obj = s3Service.getObject(
				s3Buckets.getCustomer(),
				"foo/bar/jamila"
		);

		System.out.println("Hooray "+new String(obj));
	}
}
