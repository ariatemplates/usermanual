Title: Calendar
Category: Widgets


The Calendar widget is a JavaScript-based calendar that can be embedded within a page.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/calendar/Snippet.tpl?tag=autocomplete&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [CalendarCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:CalendarCfg).

### Using default date

Calendar labels can be customized in a variety of ways according to the requirement, This can be achieved by using property _dateLabelFormat_ and _dayOfWeekLabelFormat_.

Some date patterns are defined at application level :

shortFormat, longFormat, mediumFormat and fullFormat.
Default values for these patterns are :

* shortFormat: "d/M/y"
* mediumFormat: "d MMM y"
* longFormat: "d MMMM yyyy"
* fullFormat: "EEEE d MMMM yyyy"

These patterns can be accessed through eg:`aria.core.AppEnvironment.getDateFormats().shortFormat`.
Supported patterns are similar to: http://download.oracle.com/javase/1.4.2/docs/api/java/text/SimpleDateFormat.html

### Useful Keyboard shortcuts

* Arrow Left: change the selection to the previous day
* Arrow Right: change the selection to the next day
* Arrow Up: change the selection to the same day in the previous week
* Arrow Down: change the selection to the same day in the next week

## Samples

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/calendar/' ></iframe>

## Bindings

Calendar can accept custom template thanks to property _defaultTemplate_, where user can implement there own template. Here is a customized version showing days vertically. Both calendars are bound to each other, so that selecting a day or navigating inside one calendar changes the other.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/calendar/binding/' ></iframe>