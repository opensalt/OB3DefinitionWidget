import {
  outer,
  inner,
  wrapper,
  label,
  help,
  messages,
  message,
  prefix,
  suffix,
  icon,
  textareaInput,
  initialValue,
} from '@formkit/inputs'
/**
 * Input definition for a textarea.
 * @public
 */
export const innerLabelTextareaInput = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    wrapper(
      inner(
        label('$label'),
        icon('prefix', 'label'),
        prefix(),
        textareaInput(),
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
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'textarea',
  /**
   * Additional features that should be added to your input
   */
  features: [initialValue],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: 'zq0nltggno',
}
