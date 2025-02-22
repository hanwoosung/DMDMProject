package kr.co.dmdm.entity.product.detail;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbl_emoticon_detail")
public class EmoticonDetail {
    @EmbeddedId
    private EmoticonDetailId id;
}