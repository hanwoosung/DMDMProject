package kr.co.dmdm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Table(name = "tbl_common")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gubn {
    @EmbeddedId
    private GubnCompositeKey id;
    @Column(name="name", length = 100, nullable = false)
    private String name;
    @Column(name = "first_special" ,length = 100)
    private String firstSpecial;
    @Column(name = "first_special_description" ,length = 100)
    private String firstSpecialDescription;
    @Column(name = "second_special" ,length = 100)
    private String secondSpecial;
    @Column(name = "second_special_description" ,length = 100)
    private String secondSpecialDescription;
    @Column(name = "third_special " ,length = 100)
    private String thirdSpecial;
    @Column(name = "third_special_description" ,length = 100)
    private String thirdSpecialDescription;
    @Column(name = "status" ,length = 100 , nullable = false)
    private String status;
}
