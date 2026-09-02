import { expect, test } from 'bun:test'
import {
  alsoBuilt,
  contactSection,
  experience,
  githubUser,
  links,
  profile,
  sections,
  stack,
  work,
} from '../src/content/site'

test('work holds exactly the three award projects, in order', () => {
  expect(work.map((p) => p.slug)).toEqual(['scalex', 'phisguard', 'gtx'])
  for (const project of work) {
    expect(project.achievement.length).toBeGreaterThan(0)
    expect(project.tech.length).toBeGreaterThan(0)
    expect(project.links.length).toBeGreaterThan(0)
  }
})

test('no project is duplicated into experience', () => {
  const employers = experience.map((group) => group.company.toLowerCase())
  for (const project of work) {
    expect(employers).not.toContain(project.title.toLowerCase())
  }
})

test('every outbound link is absolute https', () => {
  const hrefs = [
    links.github,
    links.linkedin,
    links.x,
    ...work.flatMap((p) => p.links.map((l) => l.href)),
    ...alsoBuilt.map((r) => r.href),
  ]
  for (const href of hrefs) {
    expect(href.startsWith('https://')).toBe(true)
  }
})

test('instagram is not referenced anywhere', () => {
  const blob = JSON.stringify({ profile, links, work, alsoBuilt })
  expect(blob.toLowerCase()).not.toContain('instagram')
})

test('also-built repos are four, all under the github user', () => {
  expect(alsoBuilt).toHaveLength(4)
  for (const repo of alsoBuilt) {
    expect(repo.href.startsWith(`https://github.com/${githubUser}/`)).toBe(true)
  }
})

test('exactly one role is marked current', () => {
  const current = experience.flatMap((g) => g.roles).filter((r) => r.current)
  expect(current).toHaveLength(1)
  expect(current[0].title).toBe('DevOps Engineer')
})

test('experience carries no role descriptions', () => {
  for (const role of experience.flatMap((g) => g.roles)) {
    expect(role).not.toHaveProperty('description')
  }
})

test('nav is three sections numbered 01 to 03, contact is 04', () => {
  expect(sections.map((s) => s.num)).toEqual(['01', '02', '03'])
  expect(sections.map((s) => s.id)).toEqual(['work', 'experience', 'about'])
  expect(contactSection.num).toBe('04')
})

test('stack is six labelled rows', () => {
  expect(stack.map((row) => row.label)).toEqual([
    'Languages',
    'Frontend',
    'Backend',
    'Data',
    'Chain',
    'Infra',
  ])
  for (const row of stack) {
    expect(row.items.length).toBeGreaterThan(1)
  }
})

test('availability is freelance wording', () => {
  expect(profile.availability).toBe('Open to freelance')
})
