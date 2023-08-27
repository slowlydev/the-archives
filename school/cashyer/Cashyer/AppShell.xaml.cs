namespace Cashyer;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();

		Routing.RegisterRoute("purchase", typeof(PurchasePage));
		Routing.RegisterRoute("offers", typeof(OffersPage));
	}
}

