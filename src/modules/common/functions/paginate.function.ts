import { SelectQueryBuilder } from 'typeorm';
import { PaginatedResult } from '../interfaces/paginate.interface';

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number,
  limit: number,
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * limit;
  const [items, totalItems] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const totalPages = Math.ceil(totalItems / limit);
  return {
    data: items,
    totalCount: totalItems,
    page,
    limit,
    totalPages,
  };
}
