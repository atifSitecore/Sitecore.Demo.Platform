using System;
using System.Web.Mvc;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.XA.Foundation.Mvc.Controllers;
using Sitecore.Demo.Platform.Feature.ExperienceAccelerator.Models;

namespace Sitecore.Demo.Platform.Feature.ExperienceAccelerator.Controllers
{
	public class EventCountDownController : StandardController
	{
		public ActionResult EventCountDown()
		{
			return View(CreateModel());
		}

		public EventCountDownModel CreateModel()
		{
			var rendering = RenderingContext.Current?.Rendering;
			var dataSourceItem = GetDataSourceItem(rendering);
			var model = new EventCountDownModel
			{
				DataSourceItem = dataSourceItem
			};

			if (dataSourceItem == null)
			{
				return model;
			}

			var endDateField = dataSourceItem.Fields[Templates.EventCountDown.Fields.EventEndDate];
			if (endDateField != null && !string.IsNullOrWhiteSpace(endDateField.Value))
			{
				var endDate = ((DateField)endDateField).DateTime;
				if (endDate > DateTime.MinValue)
				{
					model.EventEndDateUtc = Sitecore.DateUtil.ToUniversalTime(endDate);
				}
			}

			var unpublishField = dataSourceItem.Fields[Templates.EventCountDown.Fields.UnpublishAfterEvent];
			model.UnpublishAfterEvent = unpublishField != null && Sitecore.MainUtil.GetBool(unpublishField.Value, false);
			return model;
		}

		private static Item GetDataSourceItem(Rendering rendering)
		{
			if (rendering == null)
			{
				return null;
			}

			if (!string.IsNullOrWhiteSpace(rendering.DataSource))
			{
				return Sitecore.Context.Database.GetItem(rendering.DataSource);
			}

			return rendering.Item;
		}
	}
}
