namespace Cashyer;

public partial class PayPage : ContentPage
{
	public PayPage()
	{
		InitializeComponent();
	}

	void OnStepperValueChanged(object sender, ValueChangedEventArgs e)
	{
		double value = e.NewValue;
		_displayLabel.Text = value.ToString();
	}
}
