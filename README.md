✍️Tech Stacks
---
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> 

⚙️ Projects
---
1. **[DOCKin](https://github.com/DOCKin-project/DOCKin-backend)**(2025.10 ~2026.01)
![System Architecture](./picture/dockin.jpg)
- 개요: 조선소 근로자를 위한 AI 음성 인식, 다국어 번역, 안전·근태 관리를 통합한 모바일 앱
- <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white"> <img src="https://img.shields.io/badge/pgvector-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
- 다국어 임베딩 기반 **교차언어 작업일지 검색(RAG)** 구현 — 언어별 analyzer 구성 없이 한국어 질의로 베트남어 문서를, 반대로도 검색
- 검색 권한을 **후필터가 아닌 선필터**로 설계 — 후필터는 top-k를 권한 없는 문서로 채운 뒤 버려 결과가 비는 구조적 문제가 있다
- **MySQL → PostgreSQL + pgvector 이관** — MySQL 8.0에 ANN 인덱스가 없고 9.x의 VECTOR도 인덱스는 HeatWave 전용임을 확인한 뒤 결정 (ADR로 근거 기록)
- **HNSW 인덱스 recall 실측** — 전체 훑기를 정답 기준선으로 recall@5 0.840, 지연 110ms → 1.11ms(99배). "인덱스를 켰다"가 아니라 "켜도 되는지 쟀다"
- STOMP 기반 실시간 채팅 — `/pub`·`/sub` 목적지 규약으로 채팅방별 라우팅 분리, CONNECT 시점 JWT 검증으로 인증을 핸드셰이크에 고정
- 번역·STT를 FastAPI로 위임하는 연동 계층 — 제목·본문 번역을 `Mono.zip`으로 동시 호출해 왕복을 한 번으로 합류, 외부 호출 타임아웃으로 커넥션 풀 고갈 차단
- S3 Presigned URL 업로드 — 파일 바이트가 애플리케이션을 거치지 않는다
- GitHub Actions CI 구축 — 배포 실패로 제거된 이전 워크플로에서 테스트까지 함께 사라져 있던 것을 CI만 분리해 복구

2. **[shadowfit](https://github.com/Shadowfit/backend)**(2026.03 ~진행중) 
![System Architecture](./picture/shadowfit.jpg)
- 개요: 효율적인 운동 관리를 도와주는 AI 기반 개인 맞춤형 피트니스 앱
- <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
- Spring grpc 기반 비동기 실시간 운동 관절 저장 시스템 구축
- AI 분석 결과를 페르소나별로 분기해 batch gRPC로 통합 전송하는 실시간 운동 피드백 파이프라인 구축
- 세션 데이터 기반 동기화율·구간별 정확도·이전 대비 비교를 제공하는 일별 활동 리포트 API 구현
- 부하테스트로 세션 저장 병목 실측·귀속, batch insert·keyset 페이지네이션·파티셔닝으로 대용량 조회/삭제 성능 개선
- 다중 사용자 세션 갱신 lost-update 재현 후 원자 UPDATE·비관적 락·낙관적 락(CAS)으로 정합성 확보

⚙️ Open Source Contribution
---
- spring-projects/spring-ai #5297 - Elasticsearch IN/NIN 연산자 괄호 오류 수정 <a href="https://github.com/spring-projects/spring-ai/pull/5316#event-22560471170"><img src="https://img.shields.io/badge/PR-Resolved-success?style=flat-square&logo=github"></a>

- spring-projects/spring-security #18543 - AuthoritiesAuthorizationManager NPE 발생 오류 수정 <a href="https://github.com/spring-projects/spring-security/pull/18544"><img src="https://img.shields.io/badge/PR-Merged-success?style=flat-square&logo=github"></a>


🎨 Activities
---

|Type| Contents | 내용 | Date |
| :---| :--- | :--- | :--- |
| 해커톤| 2025 k조선 해커톤| 산업통상자원부장관상 | '25. 09. 08. ~ '25. 11. 22. |


📝 Certificate
---
⦁ Adsp ('25.02. )




