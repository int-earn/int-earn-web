package com.intearn.backend.service;

import com.intearn.backend.domain.Archive;
import com.intearn.backend.repository.ArchiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArchiveService {

    private final ArchiveRepository archiveRepository;

    /**
     * 모든 게시글 조회
     */
    public List<Archive> getAllArchives() {
        return archiveRepository.findAll();
    }

    /**
     * 게시글 상세 조회
     */
    public Optional<Archive> getArchiveById(Long id) {
        return archiveRepository.findById(id);
    }

    /**
     * 게시글 생성
     */
    @Transactional
    public Archive createArchive(Archive archive) {
        return archiveRepository.save(archive);
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public Archive updateArchive(Archive archive) {
        return archiveRepository.save(archive);
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deleteArchive(Long id) {
        archiveRepository.deleteById(id);
    }

}
