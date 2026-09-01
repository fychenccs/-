import assert from "node:assert/strict"
import test from "node:test"
import {
  defaultNotePropertiesOptions,
  getVisibleProperties,
  shouldShowNoteProperties,
  stringifyPropertyValue,
} from "./NoteProperties.utils"

test("detects structured properties and preserves arrays and boolean false", () => {
  const frontmatter = {
    title: "Structured note",
    id: "deepseek-codex-archival-workflow",
    type: "sop",
    domains: ["methodology", "knowledge-management"],
    canonical: false,
  }
  const properties = getVisibleProperties(frontmatter, defaultNotePropertiesOptions)

  assert.equal(shouldShowNoteProperties(frontmatter, defaultNotePropertiesOptions), true)
  assert.deepEqual(
    properties.map(({ key }) => key),
    ["type", "domains", "id", "canonical"],
  )
  assert.deepEqual(properties.find(({ key }) => key === "domains")?.value, [
    "methodology",
    "knowledge-management",
  ])
  assert.equal(
    stringifyPropertyValue(properties.find(({ key }) => key === "canonical")?.value),
    "false",
  )
})

test("hides the full panel for an ordinary article", () => {
  const frontmatter = {
    title: "Ordinary article",
    date: "2026-09-02",
    description: "Only ordinary metadata",
    tags: ["learning"],
  }

  assert.equal(shouldShowNoteProperties(frontmatter, defaultNotePropertiesOptions), false)
})

test("omits excluded and empty fields while preserving configured order", () => {
  const properties = getVisibleProperties(
    {
      title: "Hidden title",
      id: "note-id",
      canonical: false,
      maturity: "",
      missing: null,
      custom_z: "last",
      custom_a: "first",
    },
    defaultNotePropertiesOptions,
  )

  assert.deepEqual(
    properties.map(({ key }) => key),
    ["id", "canonical", "custom_a", "custom_z"],
  )
})

test("safely and stably stringifies unknown objects", () => {
  const value = {
    z: "<script>alert(1)</script>",
    a: { second: 2, first: 1 },
  }

  assert.equal(
    stringifyPropertyValue(value),
    '{"a":{"first":1,"second":2},"z":"<script>alert(1)</script>"}',
  )

  assert.equal(
    shouldShowNoteProperties({ id: "safe-note", custom: value }, defaultNotePropertiesOptions),
    true,
  )
})

test("supports configurable display and expanded defaults", () => {
  const options = {
    ...defaultNotePropertiesOptions,
    showOnAllPages: true,
    defaultCollapsed: false,
  }

  assert.equal(shouldShowNoteProperties({ title: "Ordinary", custom: "visible" }, options), true)
  assert.equal(options.defaultCollapsed, false)
})
