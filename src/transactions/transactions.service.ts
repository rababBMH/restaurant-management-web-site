import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class TransactionsService {
  async AddTransaction(createTransactionDto: CreateTransactionDto,restaurant_id:number) {
     const {type,amount,category,Description}=createTransactionDto;
     const transaction=await prisma.transaction.create({
      data:{
        restaurant_id:restaurant_id,
        type:type,
        amount:amount,
        category:category,
        Description:Description
      }
     })
     return transaction;
  }

  async editTransaction(id: number, updateTransactionDto: CreateTransactionDto) {
    const {type,amount,category,Description}=updateTransactionDto;
    const transaction=await prisma.transaction.findUnique({where:{id}})
    if(!transaction){
      throw new Error("Transaction not found")
    }
    const updatedTransaction=await prisma.transaction.update({
      where:{id},
      data:{
        type:type,
        amount:amount,
        category:category,
        Description:Description
      }
    })
    return updatedTransaction;
  }

  async deleteTransaction(id: number) {
    const transaction=await prisma.transaction.findUnique({where:{id}})
    if(!transaction){
      throw new Error("Transaction not found")
    }
    await prisma.transaction.delete({where:{id}})
    return {message:"Transaction deleted successfully"}
  }
  
  async getTransactionsByRestaurant(restaurant_id:number,type:string){
    let transactions;
    if(type==="income" || type==="expense"){
      transactions=await prisma.transaction.findMany({where:{restaurant_id,type}})
    }else{
      transactions=await prisma.transaction.findMany({where:{restaurant_id}})
    }
    return transactions;
  }

  async calculateIncomesProfites(restaurant_id:number){
    const incomeTransactions=await prisma.transaction.findMany({where:{restaurant_id,type:"income"}})
    const totalIncome=incomeTransactions.reduce((total,transaction)=>total+transaction.amount,0)
    const expenseTransactions=await prisma.transaction.findMany({where:{restaurant_id,type:"expense"}})
    const totalExpense=expenseTransactions.reduce((total,transaction)=>total+transaction.amount,0)
    const netProfit=totalIncome-totalExpense;
    return {totalIncome, totalExpense, netProfit};
  }

  async calculateExpensesPercents(restaurant_id:number){
   const expenseTransactions=await prisma.transaction.groupBy({
      by:['category'],
      where:{restaurant_id,type:"expense"},
      _sum:{
        amount:true
  }
})
   return expenseTransactions;
    }

  async IncomeExpensesComparison(restaurant_id: number) {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); 

  const incomeTransactions = await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      restaurant_id,
      date: { gte: twoDaysAgo }, 
      type: 'income',
    },
    _sum: {
      amount: true,
    },
  });

  const expenseTransactions = await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      restaurant_id,
      date: { gte: twoDaysAgo }, 
      type: 'expense',
    },
    _sum: {
      amount: true,
    },
  });

 

  return { incomeTransactions, expenseTransactions };
}

}
