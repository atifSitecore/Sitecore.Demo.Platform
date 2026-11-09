using Sitecore.Data;

namespace Sitecore.Demo.Platform.Feature.ExperienceAccelerator
{
	public struct Templates
	{
		public struct EventCountDown
		{
			public static readonly ID ID = new ID("{B7C8D9E0-F1A2-4B3C-8D4E-5F6A7B8C9D01}");

			public struct Fields
			{
				public static readonly ID EventTitle = new ID("{C8D9E0F1-A2B3-4C5D-9E6F-7A8B9C0D1E02}");
				public static readonly ID EventDescription = new ID("{D9E0F1A2-B3C4-5D6E-9F7A-8B9C0D1E2F03}");
				public static readonly ID EventEndDate = new ID("{E0F1A2B3-C4D5-6E7F-9A8B-9C0D1E2F3404}");
				public static readonly ID UnpublishAfterEvent = new ID("{F1A2B3C4-D5E6-7F8A-9B0C-0D1E2F345605}");
			}
		}
	}
}
