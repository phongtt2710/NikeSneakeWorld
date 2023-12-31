﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesDto.Stock
{
    public class StockDto
    {
        public string ProductId { get; set; }
        public int NumberSize { get; set; }
        public string StockId { get; set; }
        public string ColorId { get; set; }
        public string SizeId { get; set; }
        public int UnitInStock { get; set; }
    }

    public class GetStockIdAPI {
        public string ProductId { get; set; }
        public string ColorId { get; set; }
        public string SizeId { get; set; }

    }

}
