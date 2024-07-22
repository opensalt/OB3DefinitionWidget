import {
  outer,
  inner,
  wrapper,
  label,
  help,
  messages,
  message,
  icon,
  prefix,
  suffix,
  textInput,
  casts,
} from '@formkit/inputs'
/**
 * Input definition for a text.
 * @public
 */
export const innerLabelTextInput = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    wrapper(
      inner(
        label('$label'),
        icon('prefix', 'label'),
        prefix(),
        textInput(),
        suffix(),
        icon('suffix')
      )
    ),
    help('$help'),
    messages(message('$message.value'))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'text',
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'text',
  /**
   * Additional features that should be added to your input
   */
  features: [casts],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: 'qmwq6rtsiye',
}
