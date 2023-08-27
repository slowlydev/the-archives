namespace Cashyer;

public partial class SettingsPage : ContentPage
{
	public SettingsPage()
	{
		InitializeComponent();
	}

	void ToOffersPage(System.Object sender, Microsoft.Maui.Controls.TappedEventArgs e)
	{
		Shell.Current.GoToAsync("offers");
	}
}
