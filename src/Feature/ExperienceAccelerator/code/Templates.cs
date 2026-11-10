using Sitecore.Data;

namespace Sitecore.Demo.Platform.Feature.ExperienceAccelerator
{
	public struct Templates
	{
		public struct EventCountDown
		{
			public static readonly ID ID = new ID("{91B12457-6690-410E-8500-49D7E2EB7845}");

			public struct Fields
			{
				public static readonly ID EventTitle = new ID("{A590A827-118A-43EC-BD3C-189B2AEB75E3}");
				public static readonly ID EventDescription = new ID("{D8CC169D-1D5B-4318-A0B7-1774600F0FDE}");
				public static readonly ID EventEndDate = new ID("{CA69B0B9-ED55-4073-9F42-F9FAA5EA629B}");
				public static readonly ID UnpublishAfterEvent = new ID("{00B6FDB1-A6E9-424E-A923-A1956CC89F45}");
			}
		}
	}
}
