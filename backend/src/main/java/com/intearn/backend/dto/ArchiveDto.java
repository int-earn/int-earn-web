package com.intearn.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

public class ArchiveDto {
    @Data
    @AllArgsConstructor
    public static class ArchiveResponse {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdDate;
        private LocalDateTime modifiedDate;
        private Long userId;
        private String nickname;
        //private List img;
        private String img;
    }

    @Data
    @AllArgsConstructor
    public static class ArchiveTitleResponse {
        private Long id;
        private String title;
        private LocalDateTime createdDate;
    }

    @Data
    @AllArgsConstructor
    public static class ArchiveRequest {
        private String title;
        private String content;
    }

}