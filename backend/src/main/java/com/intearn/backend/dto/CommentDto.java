package com.intearn.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

public class CommentDto {

    @Data
    @AllArgsConstructor
    public static class CommentResponse {
        private Long id;
        private String content;
        private Boolean isMyComment;
        private Boolean isDeleted;
        private LocalDateTime createdDate;
        private Long userId;
        private String nickname;
        private String major;
        private String studentId;
    }

    @Data
    @AllArgsConstructor
    public static class CommentRequest {
        private String content;
        private Long boardId;
    }
}
