import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post(":createTransaction/:restaurant_id")
  create(@Body() createTransactionDto: CreateTransactionDto,@Param("restaurant_id") restaurant_id:number) {
    return this.transactionsService.AddTransaction(createTransactionDto,Number(restaurant_id));
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit an existing transaction' })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @Patch('edit-transaction/:id')
  editTransaction(@Param('id') id: number, @Body() updateTransactionDto: CreateTransactionDto) {
    return this.transactionsService.editTransaction(Number(id), updateTransactionDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @Delete('delete-transaction/:id')
  deleteTransaction(@Param('id') id: number) {
    return this.transactionsService.deleteTransaction(Number(id));
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transactions by restaurant' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Transactions not found' })
  @Get('restaurant-transactions/:restaurant_id/:type')
  getTransactionsByRestaurant(@Param('restaurant_id') restaurant_id:number,@Param('type') type:string) {
    return this.transactionsService.getTransactionsByRestaurant(Number(restaurant_id),type);
  }
  
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate total of incomes,expenses and net profits' })
  @ApiResponse({ status: 200, description: 'Totals calculated successfully' })
  @ApiResponse({ status: 404, description: 'Transactions not found' })
  @Get('calculate-totals/:restaurant_id')
  async calculateTotals(@Param('restaurant_id') restaurant_id:string) {
    return this.transactionsService.calculateIncomesProfites(Number(restaurant_id));

  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate total expenses' })
  @ApiResponse({ status: 200, description: 'Total expenses calculated successfully' })
  @ApiResponse({ status: 404, description: 'Transactions not found' })
  @Get('calculate-expenses/:restaurant_id')
  async calculateExpenses(@Param('restaurant_id') restaurant_id:string) {
    return this.transactionsService.calculateExpensesPercents(Number(restaurant_id));
}

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'compare between incomes and expenses last 2 days' })
  @ApiResponse({ status: 200, description: 'Incomes and expenses compared successfully' })
  @ApiResponse({ status: 404, description: 'Transactions not found' })
  @Get('daily-comparison/:restaurant_id')
  async calculateIncomes(@Param('restaurant_id') restaurant_id:string) {
    return this.transactionsService.IncomeExpensesComparison(Number(restaurant_id));
  }
}