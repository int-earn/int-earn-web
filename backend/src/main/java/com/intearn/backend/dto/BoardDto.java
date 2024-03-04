package com.intearn.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

public class BoardDto {
    @Data
    @AllArgsConstructor
    public static class BoardResponse {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdDate;
        private LocalDateTime modifiedDate;
        private Long userId;
        private String nickname;
    }

    @Data
    @AllArgsConstructor
    public static class BoardTitleResponse {
        private Long id;
        private String title;
        private LocalDateTime createdDate;
    }

    @Data
    @AllArgsConstructor
    public static class BoardRequest {
        private String title;
        private String content;
    }

}
