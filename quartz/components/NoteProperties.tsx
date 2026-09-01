import { JSX } from "preact"
import { formatDate } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/noteProperties.scss"
import {
  defaultNotePropertiesOptions,
  getVisibleProperties,
  isEmptyPropertyValue,
  NotePropertiesOptions,
  shouldShowNoteProperties,
  stringifyPropertyValue,
} from "./NoteProperties.utils"

function renderDateValue(
  key: string,
  value: unknown,
  locale: QuartzComponentProps["cfg"]["locale"],
) {
  if (key !== "created" && key !== "updated") return undefined
  if (!(typeof value === "string" || typeof value === "number" || value instanceof Date)) {
    return undefined
  }

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return undefined

  return <time datetime={date.toISOString()}>{formatDate(date, locale)}</time>
}

function renderPropertyValue(
  key: string,
  value: unknown,
  locale: QuartzComponentProps["cfg"]["locale"],
): JSX.Element {
  if (Array.isArray(value)) {
    const items = value.filter((item) => !isEmptyPropertyValue(item))
    return (
      <span class="note-property-chips" data-value-type="array">
        {items.map((item, index) => (
          <span class="note-property-chip" key={`${key}-${index}`}>
            {stringifyPropertyValue(item)}
          </span>
        ))}
      </span>
    )
  }

  const dateValue = renderDateValue(key, value, locale)
  if (dateValue) return dateValue

  if (typeof value === "object" && value !== null) {
    return (
      <code class="note-property-object" data-value-type="object">
        {stringifyPropertyValue(value)}
      </code>
    )
  }

  return (
    <span class="note-property-scalar" data-value-type={typeof value}>
      {stringifyPropertyValue(value)}
    </span>
  )
}

export default ((userOptions?: Partial<NotePropertiesOptions>) => {
  const options: NotePropertiesOptions = { ...defaultNotePropertiesOptions, ...userOptions }

  const NoteProperties: QuartzComponent = ({ fileData, cfg, displayClass }) => {
    const frontmatter = fileData.frontmatter as Record<string, unknown> | undefined
    if (!frontmatter) return null

    if (!shouldShowNoteProperties(frontmatter, options)) return null

    const properties = getVisibleProperties(frontmatter, options)
    if (properties.length === 0) return null

    return (
      <details class={classNames(displayClass, "note-properties")} open={!options.defaultCollapsed}>
        <summary class="note-properties-summary">
          <span>{options.title}</span>
          <span class="note-properties-count" aria-label={`${properties.length} 项属性`}>
            {properties.length}
          </span>
        </summary>
        <dl class="note-properties-list">
          {properties.map(({ key, value }) => (
            <div class="note-property" data-property={key} key={key}>
              <dt>{key}</dt>
              <dd>{renderPropertyValue(key, value, cfg.locale)}</dd>
            </div>
          ))}
        </dl>
      </details>
    )
  }

  NoteProperties.css = style
  return NoteProperties
}) satisfies QuartzComponentConstructor
