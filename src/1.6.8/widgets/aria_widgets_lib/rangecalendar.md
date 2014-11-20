Title: Range Calendar

The Range Calendar widget is very similar to the [calendar widget](calendar) but it allows to easily select two dates, instead of only one.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/rangecalendar/Snippet.tpl?tag=rangecalendar&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in the [RangeCalendarCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:RangeCalendarCfg).

## Simple usage

The following sample shows how to use the RangeCalendar widget in a template:

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/rangecalendar/basic/' ></iframe>

## Changing the selection logic

By default, when selecting a date (either by clicking on it, or by using the keyboard and pressing SPACE or ENTER),
the Range Calendar widget alternatively sets the `fromDate` and the `toDate` values (swapping them if necessary),
so that the boundaries of the selected date range are always the last two selected dates.

It is possible to change this logic by implementing an `onDateSelect` handler:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/rangecalendar/Snippet.tpl?tag=onDateSelect&lang=at&outdent=true'></script>

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/rangecalendar/SnippetScript.js?tag=onDateSelect&outdent=true'></script>

The `onDateSelect` handler is called just after the user clicked on a date or pressed SPACE or ENTER. The date is passed
as the `date` property of the event object. The handler can implement some custom logic with the selected date, and can
then cancel the default behavior by setting the `cancelDefault` property to `true` on the event object.

## Advanced usage

The following sample demonstrates the use of a custom `onDateSelect` handler, and shows how the `onmouseover` and `onmouseout` listeners can
be used to achieve a hover effect:

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/rangecalendar/hover/' ></iframe>

## Ranges

The Range Calendar widget can be configured to style ranges of dates in a specific way.

Each range of dates is supposed to have the structure defined in the [Range bean](http://ariatemplates.com/api/#aria.widgets.calendar.CfgBeans:Range),
referencing some CSS classes to be applied on the corresponding days.

Here is a sample showing this feature:

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/rangecalendar/ranges/' ></iframe>

The `ranges` property is [bindable](widget_bindings), which means it is possible to create a new ranges array and assign it with
`setValue` and the ranges will automatically be updated in the range calendar. However, note that changes inside an already assigned ranges
array do not trigger an update of the display, the array of ranges itself has to be a new one for the change to be detected.
