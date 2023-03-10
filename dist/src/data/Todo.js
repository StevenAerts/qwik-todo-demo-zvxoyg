/**
 * @license
 * Copyright BuilderIO All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { markDirty, QRL, Entity, getInjector, entityStateKey, toEntityKey, } from '../qwik';
import { ItemEntity } from './Item.js';
export class TodoEntity extends Entity {
    constructor() {
        super(...arguments);
        this.filteredItems = [];
    }
    async archive() {
        return this.$invokeQRL(QRL `data:/Todo_archive`);
    }
    async newItem(text) {
        return this.$invokeQRL(QRL `data:/Todo_newItem`, text);
    }
    remove(itemKey) {
        return this.$invokeQRL(QRL `data:/Todo_removeItem`, itemKey);
    }
    async setFilter(filter) {
        const injector = getInjector(this.$element);
        const itemStatePromises = this.$state.items.map((itemKey) => injector.getEntityState(itemKey));
        const items = await Promise.all(itemStatePromises);
        this.filteredItems = items
            .filter({
            all: () => true,
            active: (item) => !item.completed,
            completed: (item) => item.completed,
        }[filter])
            .map(entityStateKey); // TODO(type): fix cast
        this.$state.filter = filter;
        markDirty(this);
    }
    async $init() {
        this.filteredItems = this.$state.items;
    }
    async $newState() {
        const host = this.$element;
        return {
            completed: 0,
            filter: 'all',
            nextId: 4,
            items: [
                ItemEntity.$hydrate(host, { id: '1' }, { completed: false, title: 'Read Qwik docs' }).$key,
                ItemEntity.$hydrate(host, { id: '2' }, { completed: false, title: 'Build HelloWorld' }).$key,
                ItemEntity.$hydrate(host, { id: '3' }, { completed: false, title: 'Profit' }).$key,
            ],
        };
    }
}
TodoEntity.$qrl = QRL `data:/Todo#TodoEntity`;
TodoEntity.$type = 'Todos';
TodoEntity.$keyProps = ['todos'];
TodoEntity.MOCK_USER = toEntityKey('todos:1234');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kby5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL2RhdGEvVG9kby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULEdBQUcsRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUVYLGNBQWMsRUFDZCxXQUFXLEdBQ1osTUFBTSxTQUFTLENBQUM7QUFDakIsT0FBTyxFQUFRLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQVc3QyxNQUFNLE9BQU8sVUFBVyxTQUFRLE1BQXVCO0lBQXZEOztRQU1FLGtCQUFhLEdBQTRCLEVBQUUsQ0FBQztJQW9FOUMsQ0FBQztJQWxFQyxLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVksb0JBQW9CLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFZO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FDcEIsR0FBRyxDQUF1QyxvQkFBb0IsRUFDOUQsSUFBSSxDQUNMLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQThCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FDcEIsR0FBRyxDQUErQyx1QkFBdUIsRUFDekUsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFzQztRQUNwRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDMUQsUUFBUSxDQUFDLGNBQWMsQ0FBYSxPQUFPLENBQUMsQ0FDN0MsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSzthQUN2QixNQUFNLENBQ0w7WUFDRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUztZQUN2QyxTQUFTLEVBQUUsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO1NBQzFDLENBQUMsTUFBTSxDQUFDLENBQ1Y7YUFDQSxHQUFHLENBQUMsY0FBNkMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1FBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM1QixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVM7UUFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNCLE9BQU87WUFDTCxTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUU7Z0JBQ0wsVUFBVSxDQUFDLFFBQVEsQ0FDakIsSUFBSSxFQUNKLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUNYLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsQ0FDOUMsQ0FBQyxJQUFJO2dCQUNOLFVBQVUsQ0FBQyxRQUFRLENBQ2pCLElBQUksRUFDSixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFDWCxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLENBQ2hELENBQUMsSUFBSTtnQkFDTixVQUFVLENBQUMsUUFBUSxDQUNqQixJQUFJLEVBQ0osRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQ1gsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FDdEMsQ0FBQyxJQUFJO2FBQ1A7U0FDRixDQUFDO0lBQ0osQ0FBQzs7QUF4RU0sZUFBSSxHQUFHLEdBQUcsQ0FBWSx1QkFBdUIsQ0FBQztBQUM5QyxnQkFBSyxHQUFHLE9BQU8sQ0FBQztBQUNoQixvQkFBUyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEIsb0JBQVMsR0FBRyxXQUFXLENBQWEsWUFBWSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQnVpbGRlcklPIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL0J1aWxkZXJJTy9xd2lrL2Jsb2IvbWFpbi9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgbWFya0RpcnR5LFxuICBRUkwsXG4gIEVudGl0eSxcbiAgZ2V0SW5qZWN0b3IsXG4gIEVudGl0eUtleSxcbiAgZW50aXR5U3RhdGVLZXksXG4gIHRvRW50aXR5S2V5LFxufSBmcm9tICcuLi9xd2lrJztcbmltcG9ydCB7IEl0ZW0sIEl0ZW1FbnRpdHkgfSBmcm9tICcuL0l0ZW0uanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvZG9Qcm9wcyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvZG8ge1xuICBjb21wbGV0ZWQ6IG51bWJlcjtcbiAgZmlsdGVyOiAnYWN0aXZlJyB8ICdhbGwnIHwgJ2NvbXBsZXRlZCc7XG4gIGl0ZW1zOiBFbnRpdHlLZXk8SXRlbUVudGl0eT5bXTtcbiAgbmV4dElkOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBUb2RvRW50aXR5IGV4dGVuZHMgRW50aXR5PFRvZG9Qcm9wcywgVG9kbz4ge1xuICBzdGF0aWMgJHFybCA9IFFSTDxJdGVtRW50aXR5PmBkYXRhOi9Ub2RvI1RvZG9FbnRpdHlgO1xuICBzdGF0aWMgJHR5cGUgPSAnVG9kb3MnO1xuICBzdGF0aWMgJGtleVByb3BzID0gWyd0b2RvcyddO1xuICBzdGF0aWMgTU9DS19VU0VSID0gdG9FbnRpdHlLZXk8VG9kb0VudGl0eT4oJ3RvZG9zOjEyMzQnKTtcblxuICBmaWx0ZXJlZEl0ZW1zOiBFbnRpdHlLZXk8SXRlbUVudGl0eT5bXSA9IFtdO1xuXG4gIGFzeW5jIGFyY2hpdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuJGludm9rZVFSTChRUkw8KCkgPT4gdm9pZD5gZGF0YTovVG9kb19hcmNoaXZlYCk7XG4gIH1cblxuICBhc3luYyBuZXdJdGVtKHRleHQ6IHN0cmluZyk6IFByb21pc2U8SXRlbUVudGl0eT4ge1xuICAgIHJldHVybiB0aGlzLiRpbnZva2VRUkwoXG4gICAgICBRUkw8KHRleHQ6IHN0cmluZykgPT4gUHJvbWlzZTxJdGVtRW50aXR5Pj5gZGF0YTovVG9kb19uZXdJdGVtYCxcbiAgICAgIHRleHRcbiAgICApO1xuICB9XG5cbiAgcmVtb3ZlKGl0ZW1LZXk6IEVudGl0eUtleTxJdGVtRW50aXR5Pikge1xuICAgIHJldHVybiB0aGlzLiRpbnZva2VRUkwoXG4gICAgICBRUkw8KGtleTogRW50aXR5S2V5PEl0ZW1FbnRpdHk+KSA9PiBQcm9taXNlPHZvaWQ+PmBkYXRhOi9Ub2RvX3JlbW92ZUl0ZW1gLFxuICAgICAgaXRlbUtleVxuICAgICk7XG4gIH1cblxuICBhc3luYyBzZXRGaWx0ZXIoZmlsdGVyOiAnYWN0aXZlJyB8ICdhbGwnIHwgJ2NvbXBsZXRlZCcpIHtcbiAgICBjb25zdCBpbmplY3RvciA9IGdldEluamVjdG9yKHRoaXMuJGVsZW1lbnQpO1xuICAgIGNvbnN0IGl0ZW1TdGF0ZVByb21pc2VzID0gdGhpcy4kc3RhdGUuaXRlbXMubWFwKChpdGVtS2V5KSA9PlxuICAgICAgaW5qZWN0b3IuZ2V0RW50aXR5U3RhdGU8SXRlbUVudGl0eT4oaXRlbUtleSlcbiAgICApO1xuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgUHJvbWlzZS5hbGwoaXRlbVN0YXRlUHJvbWlzZXMpO1xuICAgIHRoaXMuZmlsdGVyZWRJdGVtcyA9IGl0ZW1zXG4gICAgICAuZmlsdGVyKFxuICAgICAgICB7XG4gICAgICAgICAgYWxsOiAoKSA9PiB0cnVlLFxuICAgICAgICAgIGFjdGl2ZTogKGl0ZW06IEl0ZW0pID0+ICFpdGVtLmNvbXBsZXRlZCxcbiAgICAgICAgICBjb21wbGV0ZWQ6IChpdGVtOiBJdGVtKSA9PiBpdGVtLmNvbXBsZXRlZCxcbiAgICAgICAgfVtmaWx0ZXJdXG4gICAgICApXG4gICAgICAubWFwKGVudGl0eVN0YXRlS2V5IGFzICgpID0+IEVudGl0eUtleTxJdGVtRW50aXR5Pik7IC8vIFRPRE8odHlwZSk6IGZpeCBjYXN0XG4gICAgdGhpcy4kc3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIG1hcmtEaXJ0eSh0aGlzKTtcbiAgfVxuXG4gIGFzeW5jICRpbml0KCkge1xuICAgIHRoaXMuZmlsdGVyZWRJdGVtcyA9IHRoaXMuJHN0YXRlLml0ZW1zO1xuICB9XG5cbiAgYXN5bmMgJG5ld1N0YXRlKCk6IFByb21pc2U8VG9kbz4ge1xuICAgIGNvbnN0IGhvc3QgPSB0aGlzLiRlbGVtZW50O1xuICAgIHJldHVybiB7XG4gICAgICBjb21wbGV0ZWQ6IDAsXG4gICAgICBmaWx0ZXI6ICdhbGwnLFxuICAgICAgbmV4dElkOiA0LFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgSXRlbUVudGl0eS4kaHlkcmF0ZShcbiAgICAgICAgICBob3N0LFxuICAgICAgICAgIHsgaWQ6ICcxJyB9LFxuICAgICAgICAgIHsgY29tcGxldGVkOiBmYWxzZSwgdGl0bGU6ICdSZWFkIFF3aWsgZG9jcycgfVxuICAgICAgICApLiRrZXksXG4gICAgICAgIEl0ZW1FbnRpdHkuJGh5ZHJhdGUoXG4gICAgICAgICAgaG9zdCxcbiAgICAgICAgICB7IGlkOiAnMicgfSxcbiAgICAgICAgICB7IGNvbXBsZXRlZDogZmFsc2UsIHRpdGxlOiAnQnVpbGQgSGVsbG9Xb3JsZCcgfVxuICAgICAgICApLiRrZXksXG4gICAgICAgIEl0ZW1FbnRpdHkuJGh5ZHJhdGUoXG4gICAgICAgICAgaG9zdCxcbiAgICAgICAgICB7IGlkOiAnMycgfSxcbiAgICAgICAgICB7IGNvbXBsZXRlZDogZmFsc2UsIHRpdGxlOiAnUHJvZml0JyB9XG4gICAgICAgICkuJGtleSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19