namespace Cashyer;

public partial class PurchasePage : ContentPage
{
	public PurchasePage()
	{
		InitializeComponent();
	}

	void ToPurchasePage(System.Object sender, Microsoft.Maui.Controls.TappedEventArgs e)
	{
		Shell.Current.GoToAsync("purchase");
	}
}
