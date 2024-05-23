import { SelectQueryBuilder } from 'typeorm';
import { PaginatedResult } from '../interfaces/paginate.interface';

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number,
  limit: number,
): Promise<PaginatedResult<T>> {
  console.log("Page: ", page)
  console.log("Limit: ", limit)
  const skip = (page - 1) * limit;
  console.log("SKip " , skip)
  const [items, totalItems] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  console.log('Total; ', totalItems);
  const totalPages = Math.ceil(totalItems / limit);
  return {
    data: items,
    totalCount: totalItems,
    page,
    limit,
    totalPages,
  };
}
