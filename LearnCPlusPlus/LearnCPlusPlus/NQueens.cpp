#include "stdafx.h"
#include <cstdio>
#include <ctime>

#define N 20

using namespace std;

//#region A Solution

void printSolution(int board[N][N])
{
	for (int i = 0; i < N; i++)
	{
		for (int j = 0; j < N; j++)
			printf(" %d ", board[i][j]);
		printf("\n");
	}
}

bool isSafe(int board[N][N], int row, int col)
{
	int i, j;

	/* Check this row on left side */
	for (i = 0; i < col; i++)
		if (board[row][i]) return false;

	/* Check upper diagonal on left side */
	for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
		if (board[i][j]) return false;

	/* Check lower diagonal on left side */
	for (i = row, j = col; j >= 0 && i<N; i++, j--)
		if (board[i][j]) return false;

	return true;
}

bool solveNQUtil(int board[N][N], int col)
{
	if (col >= N)
		return true;

	//Consider this column and try placing this queen in all rows one by one
	for (int i = 0; i < N; i++)
	{
		//Check if queen can be placed on board[i][col]
		if (isSafe(board, i, col))
		{
			board[i][col] = 1;

			if (solveNQUtil(board, col + 1))
				return true;

			board[i][col] = 0;
		}
	}

	return false;
}

bool solveNQ()
{
	int board[N][N] = { 0 };

	clock_t startTime = clock();
	if (!solveNQUtil(board, 0))
	{
		printf("Solution does not exist");
		return false;
	}
	clock_t endTime = clock();
	clock_t clockTicksTaken = endTime - startTime;

	long double timeInSeconds = clockTicksTaken / (long double)CLOCKS_PER_SEC;
	cout << timeInSeconds << "\n";

	printSolution(board);
	return true;
}

//#endregion A Solution

//#region My Solution

int binary(int num)
{
	int rem;

	if (num <= 1)
	{
		cout << num;
		return num;
	}

	rem = num % 2;
	binary(num / 2);

	return rem;
}

void printPossibleSolution(int values[N])
{
	for (int i = 0; i < N; i++)
	{
		printf(" %d ", binary(values[i]));
	}

	printf("\n");
}

bool possibleIsSafe(int board[N], int row, int col)
{
	int i, j;

	///* Check this row on left side */
	//for (i = 0; i < col; i++)
	//	if (board[row][i]) return false;

	///* Check upper diagonal on left side */
	//for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
	//	if (board[i][j]) return false;

	///* Check lower diagonal on left side */
	//for (i = row, j = col; j >= 0 && i<N; i++, j--)
	//	if (board[i][j]) return false;

	return true;
}

bool possibleSolveNQUtil(int board[N], int values[N], int col)
{
	if (col >= N)
		return true;

	////Consider this column and try placing this queen in all rows one by one
	//for (int i = 0; i < N; i++)
	//{
	//	//Check if queen can be placed on board[i][col]
	//	if (isSafe(board, i, col))
	//	{
	//		board[i][col] = 1;

	//		if (solveNQUtil(board, col + 1))
	//			return true;

	//		board[i][col] = 0;
	//	}
	//}

	return false;
}

bool possibleSolveNQ()
{
	int board[N] = { 0 };
	int values[N] = { 0 };

	clock_t startTime = clock();
	if (!possibleSolveNQUtil(board, values, 0))
	{
		printf("Solution does not exist");
		return false;
	}
	clock_t endTime = clock();
	clock_t clockTicksTaken = endTime - startTime;

	long double timeInSeconds = clockTicksTaken / (long double)CLOCKS_PER_SEC;
	cout << timeInSeconds << "\n";

	printPossibleSolution(values);
	return true;
}

//#endregion My Solution
//
//int main()
//{
//	solveNQ();
//
//	possibleSolveNQ();
//
//	int test = 0;
//	cin >> test;
//	return 0;
//}

