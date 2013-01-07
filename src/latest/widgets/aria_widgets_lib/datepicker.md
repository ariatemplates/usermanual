Title: DatePicker
Category: Widgets

DatePicker is a highly configurable widget that adds datepicker functionality to the application. For instance, you can customize the date format, restrict the selectable date ranges, add customized calender and provide date reference as per your requirement.

The simple way to add DatePicker widget to the application is as follows

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/datepicker/Snippet.tpl?tag=wgtDatePickerSimple&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [DatePickerCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:DatePickerCfg ).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/datepicker/?skip=1' ></iframe>

For Instance,you can also add a customized calender to select the date.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/datepicker/Snippet.tpl?tag=wgtDatePickerCustom&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/datepicker/customized/?skip=1' ></iframe>

## Output of DatePicker with reference
Enter date in the first date picker and the successive datepickers takes the previously entered date as the reference date when the user input is +/-N. If not date is specified then current date will be taken into account.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/datepicker/reference/?skip=1' ></iframe>