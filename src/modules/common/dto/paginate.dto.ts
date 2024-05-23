import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultDTO<T> {
  @ApiProperty()
  data: T[] | T;
  @ApiProperty()
  totalCount?: number;
  @ApiProperty()
  page?: number;
  @ApiProperty()
  limit?: number;
  @ApiProperty()
  totalPages?: number;
}
