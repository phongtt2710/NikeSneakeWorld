﻿using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Service.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Service
{
    public class NewsService : INewsService
    {
        private readonly IRepositoryManger _repositoryManger;

        public NewsService(IRepositoryManger repositoryManger)
        {
            _repositoryManger = repositoryManger;
        }

        public async Task<List<News>> GetHighlights(int count, CancellationToken cancellationToken = default)
        {
            var highlights = await _repositoryManger.NewsRepository.GetHighlights(count, cancellationToken);
            return highlights.ToList();
        }
    }

}
