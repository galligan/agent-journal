// ABOUTME: Type definitions for the agent journal MCP server
// ABOUTME: Defines interfaces for journal entries and configuration

export interface JournalEntry {
  content: string;
  timestamp: Date;
  filePath: string;
}

export interface ServerConfig {
  journalPath: string;
}

export interface ProcessFeelingsRequest {
  diary_entry: string;
}

export interface ProcessThoughtsRequest {
  feelings?: string;
  project_notes?: string;
  user_context?: string;
  technical_insights?: string;
  world_knowledge?: string;
}