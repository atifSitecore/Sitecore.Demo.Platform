using System;
using Sitecore.Data.Items;

namespace Sitecore.Demo.Platform.Feature.ExperienceAccelerator.Models
{
	public class EventCountDownModel
	{
		public Item DataSourceItem { get; set; }
		public DateTime? EventEndDateUtc { get; set; }
		public bool UnpublishAfterEvent { get; set; }

		public bool HasEventEndDate => EventEndDateUtc.HasValue;
	}
}
