import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from '@/hooks/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  value: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  type: z.enum(['income', 'expense'] as const),
});

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCategory();
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
      type: 'expense',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createCategory(values);
      toast.success('Category created successfully');
      form.reset({
        value: '',
        type: values.type,
      });
    } catch (error) {
      toast.error('Failed to create category');
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const expenseCategories = useMemo(
    () => categories?.filter((c) => c.type === 'expense') || [],
    [categories],
  );

  const incomeCategories = useMemo(
    () => categories?.filter((c) => c.type === 'income') || [],
    [categories],
  );

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your transaction categories.
          </p>
        </div>
        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add Category</CardTitle>
              <CardDescription>
                Create a new category for your transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Category name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Category'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
              <CardDescription>
                View and manage your current categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="expense" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="expense">Expense</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="expense"
                  className="max-h-[400px] overflow-y-auto"
                >
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <ul className="flex flex-col gap-2 pt-4">
                      {expenseCategories.map((category) => (
                        <li
                          key={category.id}
                          className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                        >
                          <span className="capitalize">{category.value}</span>
                          {category.userId && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive h-8 w-8"
                              onClick={() => handleDelete(category.id)}
                              disabled={isDeleting}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </li>
                      ))}
                      {expenseCategories.length === 0 && (
                        <div className="text-muted-foreground text-center text-sm">
                          No expense categories found.
                        </div>
                      )}
                    </ul>
                  )}
                </TabsContent>
                <TabsContent
                  value="income"
                  className="max-h-[400px] overflow-y-auto"
                >
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <ul className="flex flex-col gap-2 pt-4">
                      {incomeCategories.map((category) => (
                        <li
                          key={category.id}
                          className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                        >
                          <span className="capitalize">{category.value}</span>
                          {category.userId && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive h-8 w-8"
                              onClick={() => handleDelete(category.id)}
                              disabled={isDeleting}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </li>
                      ))}
                      {incomeCategories.length === 0 && (
                        <div className="text-muted-foreground text-center text-sm">
                          No income categories found.
                        </div>
                      )}
                    </ul>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
