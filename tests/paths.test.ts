// ABOUTME: Unit tests for path resolution utilities
// ABOUTME: Tests cross-platform fallback logic and environment handling

import * as path from 'path';
import { resolveJournalPath, resolveUserJournalPath, resolveProjectJournalPath } from '../src/paths';

describe('Path resolution utilities', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('resolveJournalPath uses current directory when reasonable', () => {
    // Mock a reasonable current working directory
    const mockCwd = '/Users/test/projects/my-app';
    jest.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    
    const result = resolveJournalPath('.agent/journal', true);
    expect(result).toBe(path.join(mockCwd, '.agent/journal'));
  });

  test('resolveJournalPath skips system directories', () => {
    const systemPaths = ['/', 'C:\\', '/System', '/usr'];
    
    systemPaths.forEach(systemPath => {
      jest.spyOn(process, 'cwd').mockReturnValue(systemPath);
      process.env.HOME = '/Users/test';
      
      const result = resolveJournalPath('.agent/journal', true);
      expect(result).toBe('/Users/test/.agent/journal');
    });
  });

  test('resolveJournalPath falls back to HOME when current directory excluded', () => {
    process.env.HOME = '/Users/test';
    delete process.env.USERPROFILE;
    
    const result = resolveJournalPath('.agent/journal', false);
    expect(result).toBe('/Users/test/.agent/journal');
  });

  test('resolveJournalPath uses USERPROFILE on Windows', () => {
    delete process.env.HOME;
    process.env.USERPROFILE = 'C:\\Users\\test';
    
    const result = resolveJournalPath('.agent/journal', false);
    expect(result).toBe(path.join('C:\\Users\\test', '.agent/journal'));
  });

  test('resolveJournalPath falls back to temp directory', () => {
    delete process.env.HOME;
    delete process.env.USERPROFILE;
    delete process.env.TEMP;
    delete process.env.TMP;
    
    const result = resolveJournalPath('.agent/journal', false);
    expect(result).toBe('/tmp/.agent/journal');
  });

  test('resolveUserJournalPath excludes current directory', () => {
    const mockCwd = '/Users/test/projects/my-app';
    jest.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    process.env.HOME = '/Users/test';
    
    const result = resolveUserJournalPath();
    expect(result).toBe('/Users/test/.agent/journal');
    expect(result).not.toContain('projects/my-app');
  });

  test('resolveProjectJournalPath includes current directory', () => {
    const mockCwd = '/Users/test/projects/my-app';
    jest.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    
    const result = resolveProjectJournalPath();
    expect(result).toBe(path.join(mockCwd, '.agent/journal'));
  });

  test('both user and project paths are consistent when no project context', () => {
    // Simulate no reasonable project directory
    jest.spyOn(process, 'cwd').mockReturnValue('/');
    process.env.HOME = '/Users/test';
    
    const userPath = resolveUserJournalPath();
    const projectPath = resolveProjectJournalPath();
    
    expect(userPath).toBe('/Users/test/.agent/journal');
    expect(projectPath).toBe('/Users/test/.agent/journal');
  });
});