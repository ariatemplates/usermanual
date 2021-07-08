Title: DateField

The DateField is a simple textfield whose content is interpreted as a date.There are two modes for date parsing: the European mode and the US mode.A global setting specifies which mode is actually used.
The simple way to add datefield widget is
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/datefield/Snippet.tpl?tag=wgtDatefieldSnippet&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [DateFieldCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:DateFieldCfg).
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/datefield/' ></iframe>

## Binding

The "value" property in the dateField is bind-able and can be bound to a property in the data model.
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/datefield/binding/' ></iframe>

* In the European mode,the following date formats are recognized (all are interpreted as the 13th of June; when the year is not specified, the current year is used if the date is in the future, otherwise the next year):

	* 13/06/2002
	* 13/06/02
	* 13/6/02
	* 13 06 2002
	* 13 06 02
	* 13.06.2002
	* 13.06.02
	* 13-06-2002
	* 13-06-02
	* 13062002
	* 130602
	* 13/6
	* 13/06
* In the US mode, the following date formats are recognized (all are interpreted as the 13th of June; when the year is not specified, the current year is used if the date is in the future, otherwise the next year):

	* 06/13/2002
	* 06/13/02
	* 6/13/2002
	* 6/13/02
	* 06 13 2002
	* 06 13 02
	* 06.13.2002
	* 06.13.02
	* 06-13-2002
	* 06-13-02
	* 06132002
	* 061302
	* 6/13
	* 06/13
* In both modes the following date formats are recognized:

	* 13JUN
	* 13 JUN
	* 13JUN02
	* 13JUN2002
	* JUN (if June is the current month, then it's today, otherwise the 1st of June of the current year)
	* 13 (13th day of today's month)
	* +10 (today's date + 10 days)
	* -3 (today's date -3 days)
	* 15DEC/+10 (equivalent to: 25DEC)
	* 15DEC/-3 (equivalent to: 12DEC)
	* 15DEC10/+10 (equivalent to: 25DEC10)
	* 15DEC10/-3 (equivalent to: 12DEC10)
	* 15DEC2010/+10 (equivalent to: 25DEC2010)
	* 15DEC2010/-3 (equivalent to: 12DEC2010)
* When the user leaves the field (on blur), the content is reformatted according to the pattern configured in the DateField properties.

## Error messages customization

Please refer to the main article concerning default [error messages customization](error_messages_customization).

Here is the list of error messages that can be customized, with for each: 

- the key to be used in the configuration map
- its description
- its hard-coded default value

Messages: 

- validation
  - key: `validation`
  - description: for wrong input's value format, resulting in the impossibility to interpret it for the widget's value
  - default hard-coded: `"Please enter a valid date format, for example: 10/12 or 01MAR or +4"`
- minimum value
  - key: `minValue`
  - description: for cases where the entered date is below the minimum date set in the widget's configuration
  - default hard-coded: `"Date is before the minimum date."`
- maximum value
  - key: `maxValue`
  - description: for cases where the entered date is beyond the maximum date set in the widget's configuration
  - default hard-coded: `"Date is after the maximum date."`
