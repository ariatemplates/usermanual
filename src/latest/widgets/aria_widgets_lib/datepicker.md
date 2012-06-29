Title: DatePicker


DatePicker is a highly configurable widget that adds datepicker functionality to the application. For instance, you can customize the date format, restrict the selectable date ranges, add customized calender and provide date reference as per your requirement.

The simple way to add DatePicker widget to the application is as follows

<srcinclude tag="wgtDatePickerSimple" lang="AT" outdent="true">widgets/datepicker/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [DatePickerCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:DatePickerCfg ).

<sample sample="widgets/datepicker" />

For Instance,you can also add a customized calender to select the date.

<srcinclude tag="wgtDatePickerCustom" lang="AT" outdent="true">widgets/datepicker/Snippet.tpl</srcinclude>

<sample sample="widgets/datepicker/customized" />

## Output of DatePicker with reference
Enter date in the first date picker and the successive datepickers takes the previously entered date as the reference date when the user input is +/-N. If not date is specified then current date will be taken into account. 

<sample sample="widgets/datepicker/reference" />