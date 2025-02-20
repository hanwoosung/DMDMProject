package kr.co.dmdm.entity.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "tbl_point_shop_product")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "product_name", nullable = false, length = 100)
    private String productName;

    @Size(max = 15)
    @NotNull
    @Column(name = "user_id", nullable = false, length = 15)
    private String userId;

    @Size(max = 100)
    @NotNull
    @Column(name = "product_type", nullable = false, length = 100)
    private String productType;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "product_price", nullable = false)
    private Integer productPrice;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false)
    private Instant insertDt;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dt", nullable = false)
    private Instant updateDt;

    @Size(max = 255)
    @NotNull
    @Column(name = "product_detail", nullable = false)
    private String productDetail;

    @PrePersist
    protected void onCreate() {
        insertDt = Instant.now();
        updateDt = Instant.now();
    }

}