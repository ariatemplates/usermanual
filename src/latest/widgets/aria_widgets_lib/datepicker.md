Title: DatePicker

DatePicker is a highly configurable widget that adds datepicker functionality to the application. For instance, you can customize the date format, restrict the selectable date ranges, add customized calendar and provide date reference as per your requirement.

The simple way to add DatePicker widget to the application is as follows

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/datepicker/Snippet.tpl?tag=wgtDatePickerSimple&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [DatePickerCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:DatePickerCfg ).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/datepicker/' ></iframe>

For Instance,you can also add a customized calendar to select the date.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/datepicker/Snippet.tpl?tag=wgtDatePickerCustom&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/datepicker/customized/' ></iframe>

## Output of DatePicker with reference

Enter a date in the first date picker and the successive datepickers will take the previously entered date as the reference one when the user input is `+/-N`. If no date is specified then the current date will be taken into account.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/datepicker/reference/' ></iframe>

## The default DatePicker interface

The default calendar view of the DatePicker allows to do three things:

- navigating throughout the calendar to find the desired date
- selecting the date to insert into the input field
- actually inserting the date

### Navigation

When the date picker is opened, the calendar is set on the date currently present in the input field, or if none around today's date.

The user can navigate using the mouse:

- through months by clicking the arrows located at the top corners
- directly to special dates thanks to the links available at the bottom of the date picker:
	- `Today`: centers the calendar around today's date
	- `Selected date`, _available only if a date is actually selected_: centers the calendar around the selected date

The user can also navigate using the keyboard (note that this will also change the selected date, see next section):

- through days using the [arrow keys](http://en.wikipedia.org/wiki/Arrow_keys)
- through months using the [`Page Up` and `Page Down` keys](https://en.wikipedia.org/wiki/Page_Up_and_Page_Down_keys): the day in the month will remain the same if possible (all months don't have the same number of days)

### Selection

When opening the date picker:

- if no date is present in the input field, no date is selected
- otherwise, the date corresponding to the one present in the input field is automatically selected

Then, in order to __only__ select a date, the user can use the [arrow keys](http://en.wikipedia.org/wiki/Arrow_keys).

### Insertion

To insert a date into the input field, the user will have to (left-)click on the desired day.
