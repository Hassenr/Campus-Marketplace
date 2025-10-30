package  com.campusmarketplace.supabase;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.net.URI;

@Component
public class SupabaseS3Test implements CommandLineRunner {

    @Value("${supabase.s3.endpoint}")
    private String endpoint;

    @Value("${SUPABASE_S3_ACCESS_KEY}")
    private String accessKey;

    @Value("${SUPABASE_S3_SECRET_KEY}")
    private String secretKey;

    @Override
    public void run(String... args) {
        try {
            S3Client s3 = S3Client.builder()
                    .endpointOverride(URI.create(endpoint))
                    .region(Region.US_EAST_1)
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(accessKey, secretKey)))
                    .serviceConfiguration(S3Configuration.builder()
                            .pathStyleAccessEnabled(true)
                            .build())
                    .build();

            ListBucketsResponse response = s3.listBuckets();
            System.out.println("✅ Connection successful! Buckets:");
            response.buckets().forEach(b -> System.out.println("- " + b.name()));
        } catch (S3Exception e) {
            System.out.println("❌ Connection failed: " + e.awsErrorDetails().errorMessage());
        } catch (Exception e) {
            System.out.println("❌ Error: " + e.getMessage());
        }
    }
}
