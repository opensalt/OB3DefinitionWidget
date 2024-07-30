Open Badge v3 Definition Widget
===============================

This widget provides a simple form to create an Open Badge v3 achievement
definition.

The widget can be added to an HTML page by adding a div element with
the id `ob3-definer` as a placeholder and including the javascript and
css files from the `dist` folder.

To edit an existing achievement definition, pass the definition as a
JSON string in an attribute called `data-achievement`.

When the save button is clicked in the widget a `saveDefinition` event
will be triggered with the JSON representation of the achievement
definition as the detail of the event.

The widget is styled using Bootstrap v5 CSS.  To avoid issues with
styling on the rest of the page, it is expected that the Bootstrap CSS
is loaded into the page and thus is not part of the stylesheet provided
with this widget.

Example web page with the widget:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Achievement Definition Widget</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script type="module" crossorigin src="/ob3-definer.js"></script>
    <link rel="stylesheet" crossorigin href="/ob3-definer.css">
  </head>
  <body>
    <div id="ob3-definer" data-achievement='{}'></div>
  </body>
</html>
```

Example JavaScript to capture the event:
```js
window.addEventListener('saveDefinition', function(e) {console.log(e);})
```
