import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GetUserType } from 'src/common/types';
import { Company } from './entity/company.entity';
import { CompaniesService } from './companies.service';
import { FindManyCompanyArgs, FindUniqueCompanyArgs } from './dtos/find.args';
import { CreateCompanyInput } from './dtos/create-company.input';
import { UpdateCompanyInput } from './dtos/update-company.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Garage } from 'src/models/garages/graphql/entity/garage.entity';
import { Manager } from 'src/models/managers/graphql/entity/manager.entity';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Company)
  createCompany(
    @Args('createCompanyInput') args: CreateCompanyInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.managerId);
    return this.companiesService.create(args);
  }

  @Query(() => [Company], { name: 'companies' })
  findAll(@Args() args: FindManyCompanyArgs) {
    return this.companiesService.findAll(args);
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args() args: FindUniqueCompanyArgs) {
    return this.companiesService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Company)
  async updateCompany(
    @Args('updateCompanyInput') args: UpdateCompanyInput,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findUnique({
      where: { id: args.id },
      include: { Managers: true },
    });
    checkRowLevelPermission(
      user,
      company.Managers.map((man) => man.uid),
    );
    return this.companiesService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Company)
  async removeCompany(
    @Args() args: FindUniqueCompanyArgs,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findUnique({
      ...args,
      include: { Managers: true },
    });
    checkRowLevelPermission(
      user,
      company.Managers.map((man) => man.uid),
    );
    return this.companiesService.remove(args);
  }

  @ResolveField(() => [Garage])
  garages(@Parent() company: Company) {
    return this.prisma.garage.findMany({ where: { companyId: company.id } });
  }

  @ResolveField(() => [Manager])
  managers(@Parent() company: Company) {
    return this.prisma.manager.findMany({ where: { companyId: company.id } });
  }
}
