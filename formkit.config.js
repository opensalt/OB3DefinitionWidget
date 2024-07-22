import { generateClasses } from '@formkit/themes'

const config = {
  config: {
    classes: generateClasses({
      global: { // classes
        outer: '$reset mb-3',
        input: 'form-control',
        label: 'form-label',
        help: 'form-text',
        message: 'invalid-feedback',
      },
      form: {
        form: "mt-1 mx-auto p-3 border rounded"
      },
      range: {
        input: '$reset form-range',
      },
      submit: {
        outer: '$reset mt-3',
        input: '$reset btn btn-primary'
      }
    })
  }
}

export default config
