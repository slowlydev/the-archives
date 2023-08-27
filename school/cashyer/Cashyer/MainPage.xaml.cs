namespace Cashyer;

public partial class MainPage : ContentPage
{
	public MainPage()
	{
		InitializeComponent();
	}

	void ToPurchasePage(System.Object sender, Microsoft.Maui.Controls.TappedEventArgs e)
	{
		Shell.Current.GoToAsync("purchase");
	}
}


