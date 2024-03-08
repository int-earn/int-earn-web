package com.intearn.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name="archives")
public class Archive {

    @Id @GeneratedValue
    @Column(name="archive_id")
    private Long id;

    private String title;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private String imgId;

//    @OneToMany(mappedBy = "archive", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Img> img = new ArrayList<>();


}
