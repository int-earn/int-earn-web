package com.intearn.backend.dto;

import com.intearn.backend.domain.Major;
import com.intearn.backend.domain.Role;
import com.intearn.backend.domain.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    public static class SignUpForm {
        @NotBlank
        private String nickname;
        @NotBlank
        private String username;
        @NotBlank
        private String password;
        private String rePassword;
        private String studentId;
        private Major major;

        public User toEntity() {
            return User.builder()
                    .nickname(this.nickname)
                    .username(this.username)
                    .password(this.password)
                    .studentId(this.studentId)
                    .major(this.major)
                    .role(Role.USER)
                    .build();
        }

    }

    @Getter
    public static class LoginRequest {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
    }

    @Getter
    public static class Response {
        private Long id;
        private String nickname;
        private String username;
        private String studentId;
        private Major major;

        public Response(User user) {
            this.id = user.getId();
            this.nickname = user.getNickname();
            this.username = user.getUsername();
            this.studentId = user.getStudentId();
            this.major = user.getMajor();
        }
    }

    @Getter
    public static class AuthResponse {
        private String token;
        public AuthResponse(String token) {
            this.token = token;
        }
    }

    @Getter
    public static class PutRequest {
        @NotBlank
        private String nickname;
        @NotBlank
        private String username;
        private String studentId;
        private Major major;
    }
}
