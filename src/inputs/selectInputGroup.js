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
  selectInput,
  option,
  optionSlot,
  optGroup,
  $if,
  options,
  selects,
  defaultIcon,
} from '@formkit/inputs'
/**
 * Input definition for a select.
 * @public
 */
export const selectInputGroup = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    wrapper(
      inner(
        label('$label'),
        icon('prefix'),
        prefix(),
        selectInput(
          $if(
            '$slots.default',
            () => '$slots.default',
            optionSlot(
              $if(
                '$option.group',
                optGroup(optionSlot(option('$option.label'))),
                option('$option.label')
              )
            )
          )
        ),
        $if('$attrs.multiple !== undefined', () => '', icon('select')),
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
  props: ['options', 'placeholder', 'optionsLoader'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'select',
  /**
   * Additional features that should be added to your input
   */
  features: [options, selects, defaultIcon('select', 'select')],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: 'at63zamx5wg',
}
