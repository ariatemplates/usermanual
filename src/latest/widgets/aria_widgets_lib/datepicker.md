Title: DatePicker


DatePicker is a highly configurable widget that adds datepicker functionality to the application. For instance, you can customize the date format, restrict the selectable date ranges, add customized calender and provide date reference as per your requirement.

The simple way to add DatePicker widget to the application is as follows

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/datepicker/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [DatePickerCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:DatePickerCfg ).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/datepicker/' />

For Instance,you can also add a customized calender to select the date.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/datepicker/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/datepicker/customized/' />

## Output of DatePicker with reference
Enter date in the first date picker and the successive datepickers takes the previously entered date as the reference date when the user input is +/-N. If not date is specified then current date will be taken into account. 

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/datepicker/reference/' />