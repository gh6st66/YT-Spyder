# Video Spyder: Product Roadmap

This document outlines the strategic direction and planned features for Video Spyder. Our mission is to build the most efficient and insightful tool for researchers, students, and analysts who rely on YouTube for information.

## Guiding Principles

Our development is guided by three core principles:

1.  **Workflow Efficiency**: Every feature must reduce the time it takes to get from a broad topic to actionable insight.
2.  **Data Integrity**: We prioritize accuracy and transparency, helping users trust the data they gather while encouraging critical verification.
3.  **Actionable Intelligence**: We go beyond simple data presentation to provide tools that help users synthesize information and generate novel insights.

---

### Phase 1: Foundation (Completed)

This phase established Video Spyder as a powerful research assistant with a robust, AI-simulated workflow.

-   [x] **Topic-Based Search**: AI-powered generation of video and short results.
-   [x] **AI-Powered Triage**: On-demand summaries and key moment extraction.
-   [x] **Project-Based Workflow**: Save sessions, tag videos (Use, Review, Skip), and add notes.
-   [x] **Advanced Filtering**: Narrow results by duration, date, and view count.
-   [x] **Researcher Tools**: One-click APA/MLA citations and CSV data export.
-   [x] **Professional UI**: A responsive, Android-native inspired dark theme.
-   [x] **Data Transparency**: A clear banner indicating that initial data is model-estimated.

---

### Phase 2: Ground Truth & Core Tooling (Next 3-6 Months)

This phase is focused on transitioning from a simulated environment to a tool grounded in real-world data and enhancing the core analysis toolset.

-   [ ] **Official YouTube API Integration**:
    -   Replace the Gemini API simulation with direct calls to the YouTube Data API.
    -   Provide 100% accurate metadata (view counts, upload dates, channel info, duration).
    -   Fetch official video transcripts where available.

-   [ ] **In-Video Transcript Search**:
    -   Implement a search bar to find keywords within a video's full transcript.
    -   Highlight all occurrences of the keyword in the transcript.
    -   Make transcript timestamps clickable to jump to that point in the video on YouTube.

-   [ ] **Enhanced Project Management**:
    -   Add the ability to add a detailed description to each project.
    -   Allow manual reordering of videos and shorts within a project for narrative-building.
    -   Implement project sorting options on the "Projects" page (by date, by name).

-   [ ] **UI/UX Refinements**:
    -   Introduce non-intrusive toast notifications for actions like "Citation Copied" or "Project Saved".
    -   Improve accessibility with better keyboard navigation and ARIA attributes.

---

### Phase 3: Intelligence & Synthesis (Next 6-12 Months)

With a solid foundation of real data, this phase focuses on leveraging AI to perform higher-level analysis and synthesis across multiple sources.

-   [ ] **Multi-Video AI Synthesis**:
    -   Allow users to select multiple videos within a project.
    -   Use the Gemini API to generate a synthesized report answering prompts like:
        -   "What are the common themes across these videos?"
        -   "Identify the key points of disagreement."
        -   "Create a timeline of events based on these sources."

-   [ ] **Cloud Sync & Backup**:
    -   Introduce an optional, secure user account system.
    -   Sync projects, notes, and tags across multiple devices.
    -   Ensure a seamless experience moving from a mobile device to a desktop.

-   [ ] **Expanded Export Options**:
    -   Export project data to Markdown for easy integration into notes apps (Obsidian, Notion).
    -   Generate `.ris` or `.bib` files for direct import into reference managers like Zotero and Mendeley.

---

### Phase 4: Ecosystem Expansion (Long-Term Vision)

This phase aims to integrate Video Spyder into the user's broader research ecosystem, making it an indispensable part of their daily workflow.

-   [ ] **Browser Extension**:
    -   A companion extension for Chrome and Firefox.
    -   Add any video you are currently watching on YouTube to a Video Spyder project with a single click.
    -   Automatically pull metadata and transcripts for immediate analysis.

-   [ ] **Dedicated Desktop Application**:
    -   Develop a cross-platform desktop app (using Electron or similar) for power users who manage dozens of large projects.
    -   Offer enhanced performance, offline capabilities, and deeper system integrations.

-   [ ] **Multimodal Analysis**:
    -   Go beyond text. Use AI to analyze video content for:
        -   On-screen text and slide content.
        -   Key visual scenes or objects.
        -   Audio analysis for sentiment or speaker diarization.

-   [ ] **Collaborative Projects (Future Goal)**:
    -   Allow multiple users to contribute to a single research project, sharing videos, notes, and tags in real-time.